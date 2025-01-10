import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="flex gap-2 flex-1">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search files..." 
          className="pl-8"
          type="search"
        />
      </div>
      <Button variant="outline">Category</Button>
      <Button variant="outline">Date</Button>
    </div>
  );
};