import React from "react";

class SalesRecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auto: "",
      sales_staff: "",
      customer: "",
      price: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    const autosUrl = "http://localhost:8100/api/automobiles/";
    const salesStaffsUrl = "http://localhost:8090/api/salesstaffs/";
    const customersUrl = "http://localhost:8090/api/customers/";
    const response = await fetch(autosUrl, salesStaffsUrl, customersUrl);

    if (response.ok) {
      const data = await response.json();
      this.setState({
        auto: data.autos,
        sales_staff: data.sales_staffs,
        customer: data.customers,
      });
    }
  }

  handleChange(event) {
    const value = event.target.value;
    const key = event.target.name;
    const changeDict = {};
    changeDict[key] = value;
    this.setState(changeDict);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    console.log(data);

    const salesRecordUrl = "http://localhost:8090/api/sales/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(salesRecordUrl, fetchConfig);
    if (response.ok) {
      const newSalesRecord = await response.json();
      console.log(newSalesRecord);

      const cleared = {
        auto: "",
        sales_staff: "",
        customer: "",
        price: "",
      };
      this.setState(cleared);
    }
  }
  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a new sale </h1>
            <form onSubmit={this.handleSubmit} id="create-sales-record-form">
              <div className="form-floating mb-3">
                <select
                  value={this.state.auto}
                  onChange={this.handleChange}
                  required
                  name="auto"
                  id="auto"
                  className="form-select"
                >
                  <option value="">Choose an automobile</option>
                  {this.state.autos.map((auto) => {
                    return (
                      <option key={auto.vin} value={auto.id}>
                        {auto.vin}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <select
                  value={this.state.sales_staff}
                  onChange={this.handleChange}
                  required
                  name="sales_staff"
                  id="sales_staff"
                  className="form-select"
                >
                  <option value="">Choose a sales staff</option>
                  {this.state.sales_staffs.map((sales_staff) => {
                    return (
                      <option key={sales_staff.name} value={sales_staff.id}>
                        {sales_staff.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <select
                  value={this.state.customer}
                  onChange={this.handleChange}
                  required
                  name="customer"
                  id="customer"
                  className="form-select"
                >
                  <option value="">Choose a customer</option>
                  {this.state.customers.map((customer) => {
                    return (
                      <option key={customer.name} value={customer.id}>
                        {customer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  placeholder="Sale price"
                  required
                  type="number"
                  name="price"
                  id="price"
                  value={this.state.price}
                  className="form-control"
                />
                <label htmlFor="price">Sale price</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SalesRecordForm;