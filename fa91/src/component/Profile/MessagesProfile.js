export default function MessagesProfile() {
    return (
      <div>
        <div className="tab-pane " id="messages">
          <div className="alert alert-info alert-dismissible" role="alert">
            <button type="button" className="close" data-dismiss="alert">
              ×
            </button>
            <div className="alert-icon">
              <i className="icon-info"></i>
            </div>
            <div className="alert-message">
              <span>
                <strong>Info!</strong> Lorem Ipsum is simply dummy text.
              </span>
            </div>
          </div>
          <table className="table table-hover table-striped">
            <tbody>
              <tr>
                <td>
                  <span className="float-right font-weight-bold">
                    3 hrs ago
                  </span>{" "}
                  Here is your a link to the latest summary report from the..
                </td>
              </tr>
              <tr>
                <td>
                  <span className="float-right font-weight-bold">
                    Yesterday
                  </span>{" "}
                  There has been a request on your account since that was..
                </td>
              </tr>
              <tr>
                <td>
                  <span className="float-right font-weight-bold">9/10</span>{" "}
                  Porttitor vitae ultrices quis, dapibus id dolor. Morbi
                  venenatis lacinia rhoncus.
                </td>
              </tr>
              <tr>
                <td>
                  <span className="float-right font-weight-bold">9/4</span>{" "}
                  Vestibulum tincidunt ullamcorper eros eget luctus.
                </td>
              </tr>
              <tr>
                <td>
                  <span className="float-right font-weight-bold">9/4</span>{" "}
                  Maxamillion ais the fix for tibulum tincidunt ullamcorper
                  eros.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
}
