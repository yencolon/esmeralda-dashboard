import React from 'react';
import { Spinner } from '@/components/ui/spinner';

interface LoaderSpinnerProps {
  message: string;
}

const LoaderSpinner = ({ message }: LoaderSpinnerProps) => {
  return (
    <div className="flex items-center gap-3">
       <Spinner className="text-emerald-600" size="large">
        <span>{message}</span>
      </Spinner>
    </div>
  );
};

export default LoaderSpinner;
