import { useThemeContext } from "../hook/useThemeContext";

const FilterList = ["all", "frontend", "backend", "fullstack", "other"];

export default function ProjectFilter({ currentFilter, changeFilter }) {
  const { isLightTheme } = useThemeContext();

  const handelClick = (newFilter) => {
    console.log(newFilter);
    changeFilter(newFilter);
  };

  return (
    <div className="container">
      <h4
        className={`${
          isLightTheme ? " text-dark" : " text-light"
        } text-center  `}
      >
        Filter
      </h4>

      <nav className="row  row-cols-3 g-2 justify-content-evenly">
        {FilterList.map((filter) => (
            <button
              key={filter}
              onClick={() => handelClick(filter)}
              className={
                currentFilter === filter
                  ? " btn btn-primary btn-sm col ms-1 active"
                  : " btn btn-danger btn-sm col ms-1"
              }
              type="button"
            >
              {filter}
            </button>
        ))}
      </nav>
    </div>
  );
}
