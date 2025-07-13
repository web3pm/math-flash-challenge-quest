import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				error: {
					DEFAULT: 'hsl(var(--error))',
					foreground: 'hsl(var(--error-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				game: {
					correct: 'hsl(var(--game-correct))',
					incorrect: 'hsl(var(--game-incorrect))',
					neutral: 'hsl(var(--game-neutral))',
					timer: 'hsl(var(--game-timer))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'flip-in': {
					'0%': {
						transform: 'rotateY(-90deg)',
						opacity: '0'
					},
					'100%': {
						transform: 'rotateY(0deg)',
						opacity: '1'
					}
				},
				'flip-out': {
					'0%': {
						transform: 'rotateY(0deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'rotateY(90deg)',
						opacity: '0'
					}
				},
				'pulse-correct': {
					'0%, 100%': {
						boxShadow: '0 0 0 0 hsl(var(--game-correct) / 0.4)'
					},
					'50%': {
						boxShadow: '0 0 0 20px hsl(var(--game-correct) / 0)'
					}
				},
				'pulse-incorrect': {
					'0%, 100%': {
						boxShadow: '0 0 0 0 hsl(var(--game-incorrect) / 0.4)'
					},
					'50%': {
						boxShadow: '0 0 0 20px hsl(var(--game-incorrect) / 0)'
					}
				},
				'bounce-in': {
					'0%': {
						transform: 'scale(0.3)',
						opacity: '0'
					},
					'50%': {
						transform: 'scale(1.05)'
					},
					'70%': {
						transform: 'scale(0.9)'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'flip-in': 'flip-in 0.6s ease-out',
				'flip-out': 'flip-out 0.3s ease-in',
				'pulse-correct': 'pulse-correct 1s ease-out',
				'pulse-incorrect': 'pulse-incorrect 1s ease-out',
				'bounce-in': 'bounce-in 0.6s ease-out'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-success': 'var(--gradient-success)',
				'gradient-game-bg': 'var(--gradient-game-bg)'
			},
			boxShadow: {
				'card': 'var(--shadow-card)',
				'button': 'var(--shadow-button)',
				'correct': 'var(--shadow-correct)',
				'incorrect': 'var(--shadow-incorrect)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
