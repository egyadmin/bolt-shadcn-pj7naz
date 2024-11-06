import { type ClassValue } from 'clsx';

// Professional color palette for HR analytics
export const chartColors = {
  primary: 'hsl(222, 47%, 31%)',      // Deep blue
  secondary: 'hsl(215, 25%, 27%)',     // Slate blue
  success: 'hsl(161, 94%, 30%)',       // Emerald green
  warning: 'hsl(45, 93%, 47%)',        // Warm yellow
  danger: 'hsl(0, 79%, 63%)',          // Bright red
  info: 'hsl(199, 89%, 48%)',          // Sky blue
  muted: 'hsl(215, 16%, 47%)',         // Muted blue
  accent: {
    blue: 'hsl(213, 94%, 68%)',
    green: 'hsl(142, 71%, 45%)',
    yellow: 'hsl(38, 92%, 50%)',
    red: 'hsl(0, 84%, 60%)',
    purple: 'hsl(256, 65%, 62%)'
  }
};

export const chartStyles = {
  tooltip: {
    contentStyle: {
      backgroundColor: 'hsl(var(--card))',
      border: '1px solid hsl(var(--border))',
      borderRadius: '8px',
      padding: '12px 16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      fontSize: '13px'
    },
    labelStyle: {
      color: 'hsl(var(--foreground))',
      fontWeight: 600,
      marginBottom: '8px'
    }
  },
  grid: {
    stroke: 'hsl(var(--border))',
    strokeDasharray: '4 4',
    opacity: 0.5
  },
  legend: {
    wrapperStyle: {
      paddingTop: '16px'
    },
    itemStyle: {
      fontWeight: 500,
      fontSize: '13px'
    }
  },
  axis: {
    style: {
      fontSize: '12px',
      fontWeight: 500,
      fill: 'hsl(var(--muted-foreground))'
    }
  }
};

// Chart configurations for different types of HR analytics
export const chartConfigs = {
  attendance: {
    height: 300,
    margin: { top: 20, right: 30, left: 20, bottom: 5 },
    barSize: 20,
    barGap: 4,
    radius: [4, 4, 0, 0]
  },
  performance: {
    height: 300,
    margin: { top: 20, right: 30, left: 20, bottom: 5 },
    strokeWidth: 2,
    dotSize: 4,
    activeDotSize: 6
  },
  department: {
    height: 300,
    margin: { top: 20, right: 30, left: 20, bottom: 5 },
    innerRadius: '60%',
    outerRadius: '80%'
  }
};

// Utility function for chart animations
export const chartAnimations = {
  appear: {
    animation: 'fade-in 0.5s ease-out',
    duration: 1500,
    delay: 300
  },
  update: {
    animation: 'grow 0.3s ease-out',
    duration: 300
  }
};

// Helper function to format numbers in charts
export function formatChartValue(value: number, type: 'percentage' | 'number' | 'currency' = 'number'): string {
  switch (type) {
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'currency':
      return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR'
      }).format(value);
    default:
      return value.toLocaleString();
  }
}

// Helper function to generate gradient colors for charts
export function generateChartGradient(color: string, opacity: number = 0.2) {
  return {
    fill: `linear-gradient(180deg, ${color} 0%, ${color}${Math.round(opacity * 255).toString(16)} 100%)`,
    stroke: color
  };
}