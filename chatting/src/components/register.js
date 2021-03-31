import { Formik } from "formik";

const Register = () => {

    const registerForm = {
        username : '',
        email : '',
        number :'',
        password : ''
    };

    const onFormSubmit = (value ,  { setSubmitting }) => {
        console.log(value);
        setSubmitting = true;
        
        

    }

    return (
        <div className="col-md-6 mx-auto my-auto">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md">
                        <Formik
                        initialValues = {registerForm}
                        onSubmit = {onFormSubmit}
                    >
                    { ({
                        values,
                        handleChange,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>

                                <h3 className="text-center">Create an Account</h3>

                                <label className="mt-5">Name</label>
                                <input type="text" className="form-control" id="username" onChange={handleChange} value={values.username} />

                                <label className="mt-4">Email</label>
                                <input type="text" className="form-control" id="email" onChange={handleChange} value={values.email}/>

                                <label className="mt-4">Phone Number</label>
                                <input type="text" className="form-control" id="number" onChange={handleChange} value={values.number}/>

                                <label className="mt-4">Password</label>
                                <input type="text" className="form-control" id="password" onChange={handleChange} value={values.password}/>



                                <div className="text-center">
                                    <button className="btn btn-primary mt-5 w-100" disabled={isSubmitting}>Create your Account</button>
                                </div>

                                <p className="mt-3 text-center">Already Registered? <a href="loginpage.html">Login Here</a></p>

                            </form>
                    ) }
                    </Formik>
                        </div>

                        <div className="col-md">

                        </div>

                    </div>
                    
                </div>
            </div>
        </div>
    )

}

export default Register;