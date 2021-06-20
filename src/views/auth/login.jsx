import React from 'react'

import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import './login.css';

import { startLoginEmailPassword } from '../../actions/auth';

const Login = () => {

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        dispatch( startLoginEmailPassword( data.email, data.password ) )
    };

    return (
        <section id="wrapper">
            <div class="login-register" >
                <div class="login-box card">
                    <div class="card-body">
                        <form onSubmit={ handleSubmit(onSubmit) } class="form-horizontal form-material" id="loginform" action="index.html">
                            <div class="form-group text-center mb-3">
                               <i class="fa fa-user fa-4x"></i>
                            </div>
                            <h3 class="box-title mb-3 text-center">
                                Iniciar Sesión
                            </h3>
                            <div class="form-group ">
                                <div class="col-xs-12">
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
                            <div class="form-group">
                                <div class="col-xs-12">
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
                            <div class="form-group text-center">
                                <div class="col-xs-12 p-b-20">
                                    <button class="btn btn-block btn-lg btn-info btn-rounded" type="submit">Entrar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;
