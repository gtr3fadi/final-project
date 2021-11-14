


const FilterList= ["all","frontend","backend","fullstack","other"];

export default function ProjectFilter({currentFilter,changeFilter}) {

    

    const handelClick = (newFilter) => {
        console.log(newFilter);
        changeFilter(newFilter);
    }


    return (
        <div>
            <h4 className="text-center">Filter By</h4>
            <div className=" d-flex align-items-center justify-content-center" role="group" aria-label="Basic example">
                {FilterList.map(filter => (
                    <button
                        onClick={() => handelClick(filter)}
                        className={currentFilter === filter ? "btn me-1 btn-secondary active" : "btn me-1 btn-secondary"}
                        type="button"
                        key={filter}
                    >
                        {filter}
                    </button>
                ))}



            </div>
            
        </div>
    )
}
