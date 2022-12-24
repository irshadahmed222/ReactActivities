import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/store/store';
import {v4 as uuid} from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { ActivityFormValues } from '../../../app/models/activity';


export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loadActivity,loadingInitial } = activityStore;
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title : Yup.string().required("Activity title is required"),
        category : Yup.string().required("Activity category is required"),
        description : Yup.string().required("Activity description is required"),
        date : Yup.string().required("Activity date is required").nullable(),
        city : Yup.string().required("Activity city is required"),
        venue : Yup.string().required("Activity vanue is required")
    })

    useEffect(() => {
        if(id){ 
            loadActivity(id).then(act => setActivity(new ActivityFormValues(act)));
        }
    },[id,loadActivity]);

    function handleFormSubmit(activity: ActivityFormValues) {
        if(!activity.id){
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() =>{
                navigate(`/activities/${newActivity.id}`);
            })
        } else {
            updateActivity(activity).then(() =>{
                navigate(`/activities/${activity.id}`);
            })
        }
    }


    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const {name, value} = event.target
    //     setActivity({...activity,[name]: value})
    // }

    if(loadingInitial) return <LoadingComponent content='Loading activity...' />
    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema} 
                enableReinitialize 
                initialValues={activity} 
                onSubmit={
                    (values) => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty })=> 
                (
                    <Form className='ui form' onSubmit={handleSubmit} >
                    {/* <FormField>
                        <Field placeholder="Title" name='title' />
                        <ErrorMessage name='title' render={ error => <Label basic color='red' content={error} /> } />
                    </FormField> */}
                    <MyTextInput name='title' placeholder='Title' />
                    <MyTextArea rows={4} placeholder="Description" name='description' />
                    <MySelectInput options={categoryOptions} placeholder="Category" name='category' />
                    <MyDateInput
                     placeholderText='Date'
                     name='date' 
                     showTimeSelect
                     timeCaption='time'
                     dateFormat='MMMM d, yyyy h:mm aa'
                    />
                    <Header content='Location Details' sub color='teal' />

                    <MyTextInput placeholder="City" name='city' />
                    <MyTextInput placeholder="Venue" name='venue' />
                  
                    <Button 
                        loading={isSubmitting} 
                        floated='right' 
                        positive 
                        type='submit' 
                        content='Submit'
                        disabled={isSubmitting || !isValid || !dirty} 
                    />
                    <Button as={Link} to={'/activities'} floated='right' positive type='button' content='Cancel' />
                </Form>
                )}
            </Formik>
            
        </Segment>
    )
})