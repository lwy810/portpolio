import React, { useState } from 'react';
import type { MouseEvent, CSSProperties } from 'react';


// Component Props Types
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'secondary';
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  onMouseEnter?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
  onMouseEnter?: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLDivElement>) => void;
}

interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  style?: CSSProperties;
  className?: string;
  required?:boolean;
}

interface StarsBackgroundProps {
  count?: number;
}

// Common Components
export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false, 
  style = {},
  onMouseEnter,
  onMouseLeave,
  ...props 
}) => {
  const variantClasses = {
    primary: 'button-primary',
    ghost: 'button-ghost',
    secondary: 'button-secondary'
  };
  
  return (
    <button 
      className={`button ${variantClasses[variant]} ${disabled ? 'button-disabled' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  style = {},
  onMouseEnter,
  onMouseLeave,
  ...props 
}) => (
  <div 
    className={`card ${onClick ? 'card-clickable' : ''} ${className}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={style}
    {...props}
  >
    {children}
  </div>
);

export const Input: React.FC<InputProps> = ({ 
  className = '', 
  style = {},
  ...props 
}) => (
  <input
    className={`input ${className}`}
    style={style}
    {...props}
  />
);

export const StarsBackground: React.FC<StarsBackgroundProps> = ({ count = 15 }) => (
  <div className="stars-background">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="star"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`
        }}
      >
        ✨
      </div>
    ))}
  </div>
);