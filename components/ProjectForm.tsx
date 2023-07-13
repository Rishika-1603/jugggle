"use client"

import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';




// import { categoryFilters } from '@/constant';
import { updateProject, createNewProject, fetchToken } from '@/lib/actions';
import { FormState, ProjectInterface, SessionInterface } from '@/common.types';
import { handleClientScriptLoad } from 'next/script';
import FormField from './FormField';
import { categoryFilters } from '@/constants';
import CustomMenu from './CustomMenu';
import Button from './Button';

type Props = {
    type: string,
    session: SessionInterface,
    project?: ProjectInterface
}

const ProjectForm = ({ type, session, project }: Props) => {
    const router = useRouter();
    const handleFormSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);
        const {token} = await fetchToken();
        try {
                if (type === "create") {
                    await createNewProject(form, session?.user?.id, token);
            
                    router.push("/")
                }
                        
                if (type === "edit") {
                    await updateProject(form, project?.id as string, token)
            
                    router.push("/")
                }
            
            } catch (error) {
                    //alert(`Failed to ${type === "create" ? "create" : "edit"} a project. Try again!`);
                    console.log(error);
            } 
            finally{
                setIsSubmitting(false);
            }

    };
   

    const handleChangeImage=(e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.includes('image')) {
            return alert('Please upload an image!');

         }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result as string;

            handleStateChange("image", result);
        }

    };
    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevForm) => ({ ...prevForm, [fieldName]: value }))
       
    };
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        title: project?.title || "",
        description: project?.description || "",
        image: project?.image || "",
        liveSiteUrl: project?.liveSiteUrl || "",
        githubUrl: project?.githubUrl || "",
        category: project?.category || ""

    })
    return (
        <form
            onSubmit={handleFormSubmit}
            className='flexStart form'
            >
                <div className='flexStart form_image-container '>
                <label htmlFor="poster" className="flexCenter form_image-label">
                     {!form.image && 'Choose a thumbnail for your course'}
                  </label>
                  <input
                    id="image"
                    type="file"
                    accept='image/*'
                    required={type === "create" ? true : false}
                    className="form_image-input"
                    onChange={handleChangeImage}
                />
                {form.image && (
                    <Image
                    src={form?.image}
                       className="sm:p-10 object-contain z-20" 
                       alt="Project Poster"
                        fill
                       />
                )}
                </div>
                <FormField
                  title="Title"
                  state={form.title}
                  placeholder="Jugggle"
                  setState={(value) => handleStateChange('title', value)}
                />
                <FormField
                  title="Description"
                  state={form.description}
                  placeholder="Javascript for beginners"
                  setState={(value) => handleStateChange('description', value)}
                />
                <FormField
                  type="url"
                  title="Course Link"
                  state={form.liveSiteUrl}
                  placeholder="https://jsmastery.pro"
                  setState={(value) => handleStateChange('liveSiteUrl', value)}
                />
                <FormField
                  type="url"
                  title="Github Resource Link"
                  state={form.githubUrl}
                  placeholder="https://github.com/Rishika-1603/Jugggle"
                  setState={(value) => handleStateChange('githubUrl', value)}
                />
                <CustomMenu
                title ='Category'
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange('category',value)}
                />
                  <div className="flexStart w-full">
                    <Button
                      title={isSubmitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
                      type="submit"
                      leftIcon = {isSubmitting? "" : '/plus.svg'}
                      isSubmitting={isSubmitting}
                     />
                         
                 
            </div>
           
        </form>
    )
}
//     const router = useRouter()

//     const [submitting, setSubmitting] = useState<boolean>(false);
//     const [form, setForm] = useState<FormState>({
//         title: project?.title || "",
//         description: project?.description || "",
//         image: project?.image || "",
//         liveSiteUrl: project?.liveSiteUrl || "",
//         githubUrl: project?.githubUrl || "",
//         category: project?.category || ""
//     })

    // const handleStateChange = (fieldName: keyof FormState, value: string) => {
    //     setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
    // };

//     const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
//         e.preventDefault();

//         const file = e.target.files?.[0];

//         if (!file) return;

//         if (!file.type.includes('image')) {
//             alert('Please upload an image!');

//             return;
//         }

//         const reader = new FileReader();

//         reader.readAsDataURL(file);

//         reader.onload = () => {
//             const result = reader.result as string;

//             handleStateChange("image", result)
//         };
//     };

    // const handleFormSubmit = async (e: FormEvent) => {
    //     e.preventDefault();

//         setSubmitting(true)

//         const { token } = await fetchToken()

//         try {
//             if (type === "create") {
//                 await createNewProject(form, session?.user?.id, token)

//                 router.push("/")
//             }
            
//             if (type === "edit") {
//                 await updateProject(form, project?.id as string, token)

//                 router.push("/")
//             }

//         } catch (error) {
//             alert(`Failed to ${type === "create" ? "create" : "edit"} a project. Try again!`);
//         } finally {
//             setSubmitting(false)
//         }
//     }

//     return (
//         <form
//             onSubmit={handleFormSubmit}
//             className="flexStart form">
//             <div className="flexStart form_image-container">
//                 <label htmlFor="poster" className="flexCenter form_image-label">
//                     {!form.image && 'Choose a poster for your project'}
//                 </label>
                // <input
                //     id="image"
                //     type="file"
                //     accept='image/*'
                //     required={type === "create" ? true : false}
                //     className="form_image-input"
                //     onChange={(e) => handleChangeImage(e)}
                // />
//                 {form.image && (
//                     <Image
//                         src={form?.image}
//                         className="sm:p-10 object-contain z-20" alt="image"
//                         fill
//                     />
//                 )}
//             </div>

//             <FormField
                // title="Title"
                // state={form.title}
                // placeholder="Flexibble"
                // setState={(value) => handleStateChange('title', value)}
//             />

//             <FormField
//                 title='Description'
//                 state={form.description}
//                 placeholder="Showcase and discover remarkable developer projects."
//                 isTextArea
//                 setState={(value) => handleStateChange('description', value)}
//             />

//             <FormField
//                 type="url"
//                 title="Website URL"
//                 state={form.liveSiteUrl}
//                 placeholder="https://jsmastery.pro"
//                 setState={(value) => handleStateChange('liveSiteUrl', value)}
//             />

//             <FormField
//                 type="url"
//                 title="GitHub URL"
//                 state={form.githubUrl}
//                 placeholder="https://github.com/adrianhajdin"
//                 setState={(value) => handleStateChange('githubUrl', value)}
//             />

//             <CustomMenu
//                 title="Category"
//                 state={form.category}
//                 filters={categoryFilters}
//                 setState={(value) => handleStateChange('category', value)}
//             />

//             <div className="flexStart w-full">
//                 <Button
//                     title={submitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
//                     type="submit"
//                     leftIcon={submitting ? "" : "/plus.svg"}
//                     submitting={submitting}
//                 />
//             </div>
//         </form>
//     )
// }

export default ProjectForm



