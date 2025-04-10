import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "../MoviesPage";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
  currentFilter: string;
}

const SortSelect = ({ currentFilter }: Props) => {
  const [_searchParams, setSearchParams] = useSearchParams();
  const [selectedValue, setSelectedValue] = useState(currentFilter);
  console.log(currentFilter);
  return (
    <div className="w-full">
      <Card className="w-fit gap-2">
        <CardHeader>
          <CardTitle>Sort</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedValue}
            onValueChange={(val) => {
              setSelectedValue(val);
              setSearchParams({ sortBy: val });
            }}
          >
            <SelectTrigger className="w-[220px]">
              <div className="flex items-center gap-1">
                <div>Sort by:</div>
                <SelectValue placeholder="..." />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem value={category.sortBy} key={category.sortBy}>
                    {category.dropdownLabel}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
};

export default SortSelect;
