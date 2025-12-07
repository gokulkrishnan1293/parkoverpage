import { useEffect, useRef } from 'react';

const GravityStars = ({ isDark = true }) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const starsRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Star colors based on theme
        const darkColors = [
            '#a855f7', // purple
            '#ec4899', // pink
            '#3b82f6', // blue
            '#06b6d4', // cyan
            '#f59e0b', // amber
            '#8b5cf6', // violet
        ];

        const lightColors = [
            '#7c3aed', // deeper purple
            '#db2777', // deeper pink
            '#2563eb', // deeper blue
            '#0891b2', // deeper cyan
            '#d97706', // deeper amber
            '#6d28d9', // deeper violet
        ];

        const colors = isDark ? darkColors : lightColors;

        // Star class
        class Star {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 0.5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.5 + 0.5;
            }

            update(mouse) {
                // Gravity towards mouse
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    const force = (200 - distance) / 200;
                    this.vx += (dx / distance) * force * 0.2;
                    this.vy += (dy / distance) * force * 0.2;
                }

                // Apply velocity
                this.x += this.vx;
                this.y += this.vy;

                // Friction
                this.vx *= 0.98;
                this.vy *= 0.98;

                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw(ctx) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();

                // Reduced glow for performance
                ctx.shadowBlur = 5;
                ctx.shadowColor = this.color;
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
            }
        }

        // Initialize stars - reduced count for performance
        const initStars = () => {
            starsRef.current = [];
            // Reduced star count for better performance
            const starCount = Math.min(window.innerWidth / 8, 200);
            for (let i = 0; i < starCount; i++) {
                starsRef.current.push(new Star());
            }
        };

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Reinitialize stars when canvas size changes
            initStars();
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY,
            };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Touch move handler for mobile
        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                mouseRef.current = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY,
                };
            }
        };
        window.addEventListener('touchmove', handleTouchMove);

        // Animation loop
        const animate = () => {
            // Increased fade for less trail and better performance
            const fadeAlpha = isDark ? 0.2 : 0.25;
            ctx.fillStyle = isDark
                ? `rgba(10, 10, 20, ${fadeAlpha})`
                : `rgba(240, 240, 250, ${fadeAlpha})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            starsRef.current.forEach((star) => {
                star.update(mouseRef.current);
                star.draw(ctx);
            });

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDark]);

    const darkGradient = 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)';
    const lightGradient = 'linear-gradient(135deg, #f0f4ff, #e0e7ff, #ddd6fe)';

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                background: isDark ? darkGradient : lightGradient,
                transition: 'background 0.5s ease',
            }}
        />
    );
};

export default GravityStars;
