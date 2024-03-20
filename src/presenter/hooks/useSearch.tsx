import React from "react";

export const useSearch = () => {
  const [search, setSearch] = React.useState<string>("");

  const handleSearch = (search: string) => setSearch(search);

  const handleClear = () => setSearch("");

  return {
    search,
    handleSearch,
    handleClear,
  };
};
