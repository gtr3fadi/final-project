


const FilterList= ["all","frontend","backend","fullstack","other"];

export default function ProjectFilter({currentFilter,changeFilter}) {

    

    const handelClick = (newFilter) => {
        console.log(newFilter);
        changeFilter(newFilter);
    }


    return (
      <div className="container">
        <h4 className="text-center">Filter By</h4>
        <nav className="row justify-content-center">
          {FilterList.map((filter) => (
            <div className="col d-flex justify-content-center align-items-center" key={filter}>
              <span className="badge badge-pill badge-secondary m-1">
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
