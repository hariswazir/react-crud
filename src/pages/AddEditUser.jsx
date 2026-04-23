import React from 'react'
import { useEffect } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {UserSchema} from '../validation/UserSchema'
import {InputText} from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber';
import {Button} from 'primereact/button'
// import { Object } from 'yup'

const AddEditUser = () => {
  const navigate = useNavigate();
  const {id} = useParams()


  const {register, handleSubmit, setInput, setValue, control, formState : {errors}} = useForm({
    resolver : yupResolver(UserSchema)});

    const onSubmit = async (Data) => {
      if(id) {
        await api.put(`/users/${id}`, Data)
      }else{
         await api.post("/users", Data)
      }
     
      navigate("/")
    }

     useEffect(() => {
      if(id) {
        api.get(`/users/${id}`).then((res) => {
          Object.keys(res.data).forEach((key) => {
            setValue(key, res.data[key])
          })
        })
      }
    }, [id, setValue])
  return (
    <div>
      <h2>{id ? "Edit User" : "Add USer"}</h2>
      <form className="p-fluid" onSubmit={handleSubmit(onSubmit)}>
        <div className='field'>
          <label>Name</label>
          <InputText {...register("name")}/>
          <small className='p-error'>{errors.name?.message}</small>
        </div>

        <div className='field'>
          <label>UserName</label>
          <InputText {...register("username")}/>
          <small className='p-error'>{errors.username?.message}</small>
        </div>

        <div className='field'>
          <label>Email</label>
          <InputText {...register("email")}/>
          <small className='p-error'>{errors.email?.message}</small>
        </div>

        <div className='field'>
          <label>Age</label>
          <Controller
          name="age"
          control={control}
          render={({field}) => <InputNumber 
          value={field.value}
          onValueChange={(e) => field.onChange(e.value)}
          className={errors.age ? "p-invalid" : ""}
          />}
          />
          <small className='p-error'>{errors.age?.message}</small>
        </div>

        <Button label="Save" icon="pi pi-check"/>
      </form>
    </div>
  )
}

export default AddEditUser