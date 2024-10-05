import Button from '@mui/material/Button';

import { Link } from '@/components/common/NextLinkComposed';
import { Test } from '@/components/common/Test';

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <Button>Test</Button>

      <Test></Test>

      <hr />

      <Link href="/b/all-glasses">All Glasses</Link>
      <hr />
      <Link href="/search">Search Page</Link>
    </main>
  );
}
