import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categories } from "../MoviesPage";

interface Props {
  currentFilter: string;
}

const SortSelect = ({ currentFilter }: Props) => {
  const [_searchParams, setSearchParams] = useSearchParams();
  const [selectedValue, setSelectedValue] = useState(currentFilter);

  const handleSortChange = (val: string) => {
    setSelectedValue(val);

    const updatedParams = new URLSearchParams(_searchParams);
    updatedParams.set("sortBy", val);

    setSearchParams(updatedParams);
  };

  return (
    <div className="w-full">
      <Card className="w-fit gap-2">
        <CardHeader>
          <CardTitle>Sort</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedValue} onValueChange={handleSortChange}>
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
