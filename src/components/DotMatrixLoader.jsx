import { Box } from '@mui/material';

const DotMatrixLoader = ({ size = 'medium' }) => {
  const sizes = {
    small: { dot: 4, gap: 6, matrix: 3 },
    medium: { dot: 6, gap: 8, matrix: 4 },
    large: { dot: 8, gap: 10, matrix: 5 },
  };

  const { dot, gap, matrix } = sizes[size] || sizes.medium;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${matrix}, ${dot}px)`, gap: `${gap}px` }}>
        {Array.from({ length: matrix * matrix }).map((_, i) => {
          const row = Math.floor(i / matrix);
          const col = i % matrix;
          const delay = (row + col) * 0.1;
          return (
            <Box key={i} sx={{
              width: dot, height: dot, borderRadius: '50%', background: '#3B82F6',
              animation: `dotPulse 1.5s ease-in-out ${delay}s infinite`,
              '@keyframes dotPulse': {
                '0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },
                '50%': { opacity: 1, transform: 'scale(1.2)' },
              },
            }} />
          );
        })}
      </Box>
    </Box>
  );
};

export default DotMatrixLoader;
