import { Formik } from "formik";
import img from "../assets/image.svg";

const Login = () => {

    const loginForm = {
        username: '',
        password: ''
    };

    const onFormSubmit = (value, { setSubmitting }) => {
        console.log(value);
        setSubmitting = true;
    }

    return (
        <div className="col-md-3 mx-auto" style={{ marginTop: '10rem' }}>
            <div className="card">
                <div className="card-body">
                    <img src={img} className="img-fluid" />
                    <Formik
                        initialValues={loginForm}
                        onSubmit={onFormSubmit}
                    >
                        {({
                            values,
                            handleChange,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <form onSubmit={handleSubmit}>

                                <h3 className="text-center">Login</h3>

                                <label className="mt-5">Name</label>
                                <input type="text" className="form-control" id="username" onChange={handleChange} value={values.username} />

                                <label className="mt-4">Password</label>
                                <input type="text" className="form-control" id="password" onChange={handleChange} value={values.password} />

                                <div className="text-center">
                                    <button className="btn btn-primary mt-5 w-100">Login</button>
                                </div>
                            </form>
                        )}
                    </Formik>


                </div>
            </div>
        </div>
    )

}

export default Login;