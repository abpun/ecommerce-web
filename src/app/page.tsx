import axios from 'axios';
import { Button } from '@/components/ui/button';

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <main>
      <Button>Ashwin</Button>
      <div>{JSON.stringify(data)}</div>
    </main>
  );
}
