import fs from 'fs'
import path from 'path'
import { ImageResponse } from '@vercel/og'

// Open Graph share images (1200×630) in the site's classic style, rendered at build time.
// Fonts are bundled TTFs because Satori can't use woff2 or the next/font CSS;
// Fira Code has no Vietnamese glyphs, so it is only used for ASCII labels.

export const ogSize = { width: 1200, height: 630 }

const readAsset = (...parts: string[]) => fs.readFileSync(path.join(process.cwd(), ...parts))

const fonts = [
  { name: 'Source Serif', data: readAsset('src/assets/fonts/SourceSerif4-Bold.ttf'), weight: 700 as const },
  { name: 'Source Serif', data: readAsset('src/assets/fonts/SourceSerif4-Regular.ttf'), weight: 400 as const },
  { name: 'Fira Code', data: readAsset('src/assets/fonts/FiraCode-Regular.ttf'), weight: 400 as const },
]

const logo = `data:image/png;base64,${readAsset('src/app/icon.png').toString('base64')}`

const colors = {
  paper: '#FCFBF8',
  ink: '#1F2328',
  muted: '#5F646B',
  accent: '#4F48B8',
  sidebar: '#111111',
}

// Long titles get a smaller size so they stay within three lines
const titleSize = (title: string) => (title.length > 80 ? 54 : title.length > 55 ? 62 : 72)

export function renderOgImage({ label, title, subtitle, meta }: { label: string; title: string; subtitle?: string; meta?: string }) {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: colors.paper, fontFamily: 'Source Serif' }}>
        {/* Dark strip echoing the site's left sidebar */}
        <div style={{ display: 'flex', width: 28, height: '100%', background: colors.sidebar }} />

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '56px 72px 52px 64px' }}>
          {/* Purple nav bar */}
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              background: colors.accent,
              color: 'white',
              fontFamily: 'Fira Code',
              fontSize: 26,
              padding: '8px 18px',
            }}
          >
            {label}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
            <div style={{ display: 'flex', fontSize: titleSize(title), fontWeight: 700, color: colors.ink, lineHeight: 1.15 }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ display: 'flex', marginTop: 24, fontSize: 32, color: colors.muted, lineHeight: 1.35 }}>{subtitle}</div>
            )}
          </div>

          {/* Footer: author + site, meta on the right */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '2px solid #E2DFD8',
              paddingTop: 24,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img src={logo} width={56} height={56} />
              <div style={{ display: 'flex', marginLeft: 16, fontSize: 30, fontWeight: 700, color: colors.ink }}>Smile</div>
              <div style={{ display: 'flex', marginLeft: 16, fontFamily: 'Fira Code', fontSize: 24, color: colors.muted }}>
                haismile.dev
              </div>
            </div>
            {meta && <div style={{ display: 'flex', fontFamily: 'Fira Code', fontSize: 24, color: colors.muted }}>{meta}</div>}
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts }
  )
}

export const bannerSize = { width: 1200, height: 600 }

// Article banner for posts without their own image. Unlike the share card it leaves the
// title out (the page shows it right below) and shows the topic and tags instead.
export function renderBannerImage({ label, topic, tags }: { label: string; topic: string; tags: string[] }) {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: colors.paper, fontFamily: 'Source Serif' }}>
        <div style={{ display: 'flex', width: 28, height: '100%', background: colors.sidebar }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '56px 72px 56px 64px', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              background: colors.accent,
              color: 'white',
              fontFamily: 'Fira Code',
              fontSize: 26,
              padding: '8px 18px',
            }}
          >
            {label}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 104, fontWeight: 700, color: colors.ink, lineHeight: 1.05 }}>{topic}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 28, fontFamily: 'Fira Code', fontSize: 30, color: colors.accent }}>
              {tags.map((tag) => (
                <div key={tag} style={{ display: 'flex', marginRight: 28 }}>
                  #{tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...bannerSize, fonts }
  )
}
