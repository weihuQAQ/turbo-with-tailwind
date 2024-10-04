'use client';

import { Button } from '@mui/material';

export function Test() {
  return (
    <div>
      <Button onClick={() => console.log(12345)}>Test</Button>
    </div>
  );
}
