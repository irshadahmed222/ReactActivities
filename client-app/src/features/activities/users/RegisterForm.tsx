import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Header } from 'semantic-ui-react';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/store/store';
import * as Yup from 'yup';
import ValidationErrors from '../../errors/ValidationErrors';

export default observer(function RegisterForm() {
    const { userStore } = useStore();
    return (
        <Formik
            initialValues={{ displayName: '', username: '', email: '', password: '', error: null}} 
            onSubmit={(values,{setErrors}) => 
            userStore.register(values).catch(error => setErrors({error}))}
            validationSchema= {Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required(),
                password: Yup.string().required(),
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) =>(
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content="Signup to Reactivities" color='teal' textAlign="center"/>
                    <MyTextInput placeholder="Display Name" name="displayName" />
                    <MyTextInput placeholder="User Name" name="username" />
                    <MyTextInput placeholder="Email" name="email" />
                    <MyTextInput placeholder="Password" name="password" type="password" />
                    <ErrorMessage name='error' render={()=> 
                        <ValidationErrors errors={errors.error}/>
                        } 
                    />
                    <Button 
                        isValid={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} 
                        positive 
                        content="Login" 
                        type="submit" 
                        fluid 
                    />
                </Form>
            )}
        </Formik>
    )
})