from model import loadmodel

model, tokenizer = loadmodel()


job_role = "Java Developer"
skills = ["Java", "Data Structures and Algorithms", "Object Oriented Programming" ]
experience_level = "Intermediate"
    
    
prompt = (f"You are an interviewer for a {job_role} position. Ask questions based on the following skills and experience:\n")
for skill in skills:
    prompt += f"- Skill: {skill}\n"
prompt += (f"Experience Level: {experience_level}\n Please provide three questions for each skill.")
    

inputs = tokenizer(prompt, return_tensors="pt")
    
outputs = model.generate(inputs.input_ids, max_length=500, temperature=0.7, num_return_sequences=1)
    
questions = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
print(questions)


