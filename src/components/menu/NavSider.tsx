import { SearchIcon } from 'lucide-react';

export default function NavSider() {
  return (
    <div className="flex w-80 justify-between h-10 rounded-md border-input bg-secondary px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
      <input
        className="p-0 outline-none h-auto w-full bg-transparent border-none"
        placeholder="What you are looking for?"
      />
      <SearchIcon />
    </div>
  );
}
