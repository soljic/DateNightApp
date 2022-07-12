import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import { useStore } from "../../app/layout/stores/store";
import React, { useEffect, useState } from "react";

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({setEditMode}: Props) {
    const {profileStore: {profile, updateProfile,loadProfile}} = useStore();
    const[displayName, setName] = useState(profile?.displayName);
    const[bio, setBio] = useState(profile?.bio);
    const[loading,setLoading] = useState(false);

    useEffect(() => {
        setName(profile?.displayName);
        setBio(profile?.bio)
    }, [profile?.displayName,profile?.bio ])
    
    return (
        <Formik
            initialValues={{displayName: displayName, bio: bio}}
            onSubmit={values => {
                setLoading(true);
                updateProfile(values).then(() => {
                    if(values.displayName){
                        loadProfile(values.displayName.toLowerCase()).then(() => {
                            setName(profile?.displayName);
                            setBio(profile?.bio);
                        })
                    }
                   
                  
                    console.log('BIO',bio)
                    setLoading(false);
                    setEditMode(false);
                   
                })
            }}
            validationSchema={Yup.object({
                displayName: Yup.string().required()
            })}
        >
            {({isSubmitting, isValid, dirty}) => (
                <Form className='ui form'>
                    <MyTextInput placeholder='Display Name' name='displayName' />
                    <MyTextArea rows={3} placeholder='Add your bio' name='bio' />
                    <Button 
                        positive
                        type='submit'
                        loading={loading}
                        content='Update profile'
                        floated='right'
                        disabled={!isValid || !dirty}
                    />
                </Form>
            )}
        </Formik>
    )
})