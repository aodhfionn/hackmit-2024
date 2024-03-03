// import './CreatePost.css'

// interface CreatePostProps {
//     callback: () => void;
// }

// interface FieldProps {
//     title: string;
//     placeholder: string;
//     name: string;
// }

// const stateArray: string[] = [
//     "AL",
//     "AK",
//     "AZ",
//     "AR",
//     "CA",
//     "CO",
//     "CT",
//     "DE",
//     "FL",
//     "GA",
//     "HI",
//     "ID",
//     "IL",
//     "IN",
//     "IA",
//     "KS",
//     "KY",
//     "LA",
//     "ME",
//     "MD",
//     "MA",
//     "MI",
//     "MN",
//     "MS",
//     "MO",
//     "MT",
//     "NE",
//     "NV",
//     "NH",
//     "NJ",
//     "NM",
//     "NY",
//     "NC",
//     "ND",
//     "OH",
//     "OK",
//     "OR",
//     "PA",
//     "RI",
//     "SC",
//     "SD",
//     "TN",
//     "TX",
//     "UT",
//     "VT",
//     "VA",
//     "WA",
//     "WV",
//     "WI",
//     "WY"
// ]

// function Field(props: FieldProps) {
//     return (
//         <div className="cp-field-container">
//             <h1 className="cp-title"> {props.title} </h1>
//             <input type="text" placeholder={props.placeholder} name={props.name} required/>
//         </div>
//     )
// }

// export default function CreatePost(props: CreatePostProps) {
//     return (
//         <div className="cp-container">
//             <form onSubmit={props.callback}>
//                 <Field title='Title' placeholder='Title' name='title'/>
//                 <Field title='Name' placeholder='Name' name='name'/>

//                 <div className="cp-location-section"> 


//                     <select name="state">
//                         {stateArray.map((state) => {
//                             return <option value={state}> {state} </option>
//                         })}
//                     </select>
//                 </div>
//             </form>
//         </div>
//     )
// }

import { PostItemProps, stateArray } from '../lib/interfaces';
import './CreatePost.css';

interface CreatePostProps {
    callback: (props: PostItemProps) => void;
    closeCallback: () => void;
}

interface FieldProps {
    title: string;
    placeholder: string;
    name: string;
}

function Field(props: FieldProps) {
    return (
        <div className="cp-field-container">
            <input type="text" placeholder={props.placeholder} id={props.name} required className="cp-input"/>
        </div>
    );
}

export default function CreatePost(props: CreatePostProps) {
    function submit() {
        let formData: PostItemProps = {
            title: (document.getElementById('title') as HTMLInputElement).value,
            author: (document.getElementById('author') as HTMLInputElement).value,
            location_state: (document.getElementById('state') as HTMLInputElement).value,
            location_city: (document.getElementById('city') as HTMLInputElement).value,
            description: (document.getElementById('description') as HTMLInputElement).value
        }

        props.callback(formData);
        props.closeCallback();
    }

    return (
        <div className="cp-container" id='cp-container'>
            <h1> Create New Post </h1>
            <div className="cp-form">
                <div className="cp-fields">
                    <Field title='Title' placeholder='Enter title' name='title'/>
                    <Field title='Author' placeholder='Author name' name='author'/>
                    <select id="state" className="cp-field-container cp-input">
                        {stateArray.map((state) => {
                            return <option value={state}> {state} </option>
                        })}
                    </select>
                    <Field title='City/Town' placeholder='City or Town' name='city'/>
                </div>
                <div className="cp-description-container">
                    <textarea placeholder='Description' id='description' required className="cp-textarea"></textarea>
                </div>
                <button className="cp-submit-button" onClick={submit}>Create Post</button>
            </div>
            <button className="cp-closebutton" onClick={props.closeCallback}>X</button>
        </div>
    );
}


