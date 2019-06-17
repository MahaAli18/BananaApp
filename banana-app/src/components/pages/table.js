// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";
import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

const BasicTable = props => {
  return (
    <MDBTable responsive>
      <MDBTableHead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Page Name</th>
          <th></th>
          <th></th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td><a href="" className="btn btn-success">Update</a></td>
          <td><a href="" className="btn btn-danger">Delete</a></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td><a href="" className="btn btn-success">Update</a></td>
          <td><a href="" className="btn btn-danger">Delete</a></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
          <td><a href="" className="btn btn-success">Update</a></td>
          <td><a href="" className="btn btn-danger">Delete</a></td>

        </tr>
      </MDBTableBody>
    </MDBTable>
  );
}

export default BasicTable;