'use client';

import React, { useRef, useEffect, useState } from 'react';

// ==========================================
// BƯỚC 1: ĐỊNH NGHĨA CÁC TYPE & INTERFACE
// ==========================================
// TODO: Thêm các thuộc tính cần thiết (ví dụ: dx, dy, speed, color, status...)
export interface Ball {
  x: number;
  y: number;
  radius: number;
  // Thêm các thuộc tính di chuyển...
}

export interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  // Thêm các thuộc tính di chuyển...
}

export interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  status: number; // 1 = chưa vỡ, 0 = đã vỡ
  // Thêm các thuộc tính khác...
}

interface BreakoutGameProps {
  className?: string;
}

export function BreakoutGame({ className = '' }: BreakoutGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ==========================================
    // BƯỚC 2: KHỞI TẠO CÁC BIẾN TRẠNG THÁI GAME
    // ==========================================
    let animationFrameId: number;
    
    // TODO: Khởi tạo ball, paddle, và mảng bricks ở đây
    
    // Ví dụ: Lắng nghe sự kiện bàn phím cho Paddle
    const keyDownHandler = (e: KeyboardEvent) => {
      // TODO: Xử lý khi nhấn phím trái/phải
    };
    
    const keyUpHandler = (e: KeyboardEvent) => {
      // TODO: Xử lý khi nhả phím trái/phải
    };

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    // ==========================================
    // BƯỚC 3: HÀM VẼ (DRAW) & CẬP NHẬT (UPDATE)
    // ==========================================
    const draw = () => {
      // 1. Xóa canvas cũ để vẽ frame mới
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 2. TODO: Gọi các hàm vẽ
      // drawBall();
      // drawPaddle();
      // drawBricks();

      // 3. TODO: Xử lý va chạm (Collision detection)
      // - Va chạm tường (trái, phải, trên)
      // - Va chạm paddle (nảy lên)
      // - Va chạm gạch (nảy lại, gạch vỡ, tăng điểm)
      // - Rơi xuống đáy (Game Over)

      // 4. TODO: Cập nhật vị trí ball và paddle cho frame tiếp theo

      // Gọi lại hàm draw cho frame tiếp theo
      animationFrameId = requestAnimationFrame(draw);
    };

    // Bắt đầu vòng lặp game
    draw();

    // Cleanup khi component unmount
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className="flex justify-between w-full max-w-2xl px-4 text-white font-fira">
        <div>Score: {score}</div>
        {isGameOver && <div className="text-red-500 font-bold">GAME OVER</div>}
      </div>
      
      {/* 
        Kích thước Canvas mặc định là 800x600. 
        Bạn có thể tuỳ chỉnh theo ý thích.
      */}
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="bg-dark-secondary border border-border-primary rounded-lg shadow-lg"
      />
      
      <div className="text-text-secondary text-sm font-fira">
        Use Left and Right arrows to move the paddle
      </div>
    </div>
  );
}
