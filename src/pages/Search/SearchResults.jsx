import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import RecentlyViewed from "../../components/Sections/RecentlyViewed/RecentlyViewed";
import ProductsLayout from "../../components/Layout/ProductsLayout/ProductsLayout";
import { fetchSearchResults } from "../../api/fetchSearchResults";
import useCarousel from "../../hooks/useCarousel";
import PaginationBtn from "../../components/Buttons/Pagination/PaginationBtn";

import ErrorMessage from "../../components/UI/Error/ErrorMessage";

import styles from "./searchError.module.scss";

const SearchResults = ({ recentItem }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "";

  const handleSortChange = (value) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set("sort", value);
    } else {
      nextParams.delete("sort");
    }

    setSearchParams(nextParams);
  };

  const {
    data: results = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["searchResults", query, sort],
    queryFn: () => fetchSearchResults(query, sort),
    enabled: query.trim().length > 0,
    placeholderData: (prev) => prev,
    retry: 1,
  });

  const isInitialSearch = isLoading || (isFetching && results.length === 0);

  const shouldShowSort = !isFetching && results.length > 1;

  const PAGE_SIZE = 8;

  const { visibleItems, canGoPrev, canGoNext, goPrev, goNext } = useCarousel(
    results,
    PAGE_SIZE,
    PAGE_SIZE,
  );

  const pagination =
    !isLoading && results.length > PAGE_SIZE ? (
      <PaginationBtn
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        goPrev={goPrev}
        goNext={goNext}
      />
    ) : null;

  if (!query.trim()) {
    return (
      <section className="searchResults">
        <div>
          <h2> Search Tech Tunes </h2>
          <p> Enter an artist, album, product, or category to get started.</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <ErrorMessage
        resource="your search results"
        onRetry={refetch}
        error={error}
      />
    );
  }

  return (
    <section className="searchResults">
      <div className="returnSearch">
        <div className="resultsList">
          {!isFetching && results.length === 0 ? (
            <div className={styles.noResults}>
              <div>
                <h2> Sorry, no results found for "{query}"</h2>
                <p> Try searching something else. </p>
                <button type="button" onClick={() => navigate(-1)}>
                  Go back
                </button>
              </div>
            </div>
          ) : (
            <ProductsLayout
              title={
                isInitialSearch
                  ? `Searching for: ${query}`
                  : `Showing ${results.length} Result(s) for: ${query}`
              }
              products={visibleItems}
              isLoading={isInitialSearch}
              sort={sort}
              showBadge={true}
              showSort={shouldShowSort}
              setSort={handleSortChange}
              headerActions={pagination}
              footerActions={pagination}
            />
          )}
        </div>
        <RecentlyViewed currentItem={recentItem} />
      </div>
    </section>
  );
};

export default SearchResults;
