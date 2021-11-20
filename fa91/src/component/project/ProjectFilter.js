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

      <nav className="row justify-content-center g-0">
        {FilterList.map((filter) => (
          <div
            className="col d-flex justify-content-center align-items-center"
            key={filter}
          >
            <span className="badge badge-pill badge-secondary ">
              <button
                onClick={() => handelClick(filter)}
                className={
                  currentFilter === filter
                    ? " btn btn-primary btn-sm active"
                    : " btn btn-danger btn-sm"
                }
                type="button"
                key={filter}
              >
                {filter}
              </button>
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
}
