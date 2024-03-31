import React from 'react'
import Sidebar from "../sidebar/Sidebar";
import { Input,Button } from 'antd';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { Select } from 'antd';
import { useState,useRef } from 'react';
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "./constants";
import { executeCode } from './api';
import { Card, Space ,Steps,message} from 'antd';
import   {PlusCircleOutlined,ArrowLeftOutlined,ArrowRightOutlined}      from '@ant-design/icons';
import { useParams,useNavigate } from 'react-router-dom';
import "./addPSExercise.css"
const languages = Object.entries(LANGUAGE_VERSIONS);

const { TextArea } = Input;
const { Option } = Select; 
 function AddPBExercise() {

  const editorRef = useRef();
  const navigate=useNavigate()
  const [problem,setProblem]=useState('' );
  const [outPut,setOutPut]=useState(null);
  const [value, setValue] = useState("");
  const [current, setCurrent] = useState(0);
  const [language, setLanguage] = useState("javascript");
  const {lessonID} = useParams();
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };



  const onSelect = (language) => {
    setLanguage(language)
    setValue(
      CODE_SNIPPETS[language]
    )
  }
    const onChange = (value) => {
        console.log(`selected ${value}`);
      };
      
      const onSearch = (value) => {
        console.log('search:', value);
      };

      const runCode = async ()=> {
        const sourceCode= value ; 
        if (!sourceCode) return ; 
         try {
const {run:result} = await executeCode(language,sourceCode)
setOutPut(result.output) ;
         } catch(error) {
          console.log('ERROR ',error) ;
         }
      }
      const handleTextChange = (event) => {
       setProblem(event.target.value);
      };

      const createExercise =async ()=> {
const exercise = {
     idLesson: lessonID ,
        type:'Problem Solving', 
        language: language,
        question: problem,
         solution:value,      
}

console.log("exercise problem solving : ",exercise);
        try {
          const response = await axios.post('http://localhost:5002/create_problemsolv', exercise); 
          console.log("Response from api : ",response.data) ;
          message.success('Processing complete!') 
          navigate(`/exercises/${lessonID}`) ;

        } catch(error) {
          console.log('ERROR ',error) ;
        }
      }
      
      // Filter `option.label` match the user type `input`
      const filterOption = (input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

      const steps = [ 
        {
        title:'Problem',
        content : (<div className='step-problem'>
          <br></br>
             <p className='text'> You must provide the problem for the exercise.</p>
             <div style={{alignItems:'center',alignContent:'center'}}> 
               <Select
        style={{marginTop:'10px'}}
       
    showSearch
    placeholder="Select a language"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={filterOption}
    value={language} onSelect={onSelect}
  > 
 
  {languages.map(([lang, version]) => (
   <Option  key={lang} value={lang}> {lang} </Option>

  ) ) }
   </Select>
<br></br>
<br></br>
        <TextArea rows={4}
         placeholder="write your problem exercise here..."
         value={problem}
         onChange={handleTextChange}
          />
          </div>
        </div> ) , 
        }, 
    {title:'Solution', 
content: ( <div>
  <br></br> 
      
       <p className='text'> You must provide the solution for the exercise in order to assist the student.</p>
<br/>
<div style={{alignItems:'center',display:'flex'}}> 
  <div style={{width:'950px',height:'250px'}}> 
 
  <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
      
            height="40vh"
            width="550px"
            theme="vs-night-blue"
            
            
            language={language}
            defaultLanguage='javascript'
            defaultValue='// some comments'
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
</div>
<div style={{width:'950px',height:'250px',marginLeft:'5px'}}> 
 <Button style={{width:'125px',color:"white",backgroundColor:"#1f1246",marginRight:'310px'}}
 onClick={runCode}
 >
  Run 
 </Button>
 
          <Card
      style={{
        width: '435px',
        height:'250px',
        marginTop:'15px',
        marginLeft:'5px'
      }}
    > {outPut ? outPut: 'Click "Run Code" to see the output here'}
    </Card>
          
          </div>

         
</div>
</div>
)}

      ]

      const next = () => {
       
      setCurrent(current + 1);
    };
    
      const prev = () => {
        setCurrent(current - 1);
      };
  
      const items = steps.map((item) => ({ key: item.title, title: item.title }));


  return (
    <div className="container">
    <Sidebar/>
    <div className="main">

    <h2  style={{
            textAlign: "Left",
            fontSize: "25px",
            marginTop: "35px",
            color: "#1f1246",
          }}> 📝 Create Problem solving Exercise  </h2>

    <>
      <Steps current={current} items={items} 
     
      className="custom-steps" />
      <div className='content-stepp'>
        {steps[current].content} 
    
        </div>
      <div style={{ marginTop: 24 , marginLeft:'120px' }}>
       
      {current > 0 && (
          <Button style={{ margin: '0 8px' }} 
          icon={<ArrowLeftOutlined/>}
          onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
  
          <Button className='custom-button'
          icon={<ArrowRightOutlined/>}
          type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button className='custom-button'
          type="submit" onClick={()=> createExercise()} >
            Done
          </Button>
        )}
       
      </div>
    </>





        </div>
        </div>
       
  )

}


export default AddPBExercise ; 
