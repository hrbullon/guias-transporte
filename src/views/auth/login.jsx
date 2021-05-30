import React from 'react'

import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";

import { startLoginEmailPassword } from '../../actions/auth';

const Login = () => {

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        dispatch( startLoginEmailPassword( data.email, data.password ) )
    };

    return (
        <section id="wrapper">
        <div className="row">
            <div className="col-4">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={ handleSubmit(onSubmit) } className="form-horizontal form-material" id="loginform">
                            <h3 className="box-title m-b-20">Iniciar Sesión</h3>
                            <div className="form-group ">
                                <div className="col-xs-12">
                                    <input 
                                        className="form-control" 
                                        name="email" 
                                        autoComplete="off" 
                                        type="text" 
                                        placeholder="Correo Electrónico"
                                        {...register("email", { required: true })}
                                    /> 
                                    {
                                        (errors?.email?.type === 'required') && 
                                        (<span className="text-danger">Correo electrónico es obligatorio</span>)
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <input 
                                        className="form-control" 
                                        name="password" 
                                        autoComplete="off" 
                                        type="password" 
                                        placeholder="Contraseña"
                                        {...register("password", { required: true })}
                                    />
                                    {
                                        (errors?.password?.type === 'required') && 
                                        (<span className="text-danger">Contraseña es obligatoria</span>)
                                    }
                                </div>
                            </div>
                            <div className="form-group text-center">
                                <div className="col-xs-12 p-b-20">
                                    <button className="btn btn-block btn-lg btn-info btn-rounded" type="submit">Entrar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Login;
