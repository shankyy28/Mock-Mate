from model import loadmodel

class InterviewQuestionGenerator:
    def __init__(self):
        self.model, self.tokenizer = loadmodel()  # Loading Llama


    def generate_questions(self, job_role, skills, experience_level):
        
        prompt = f"You are an interviewer for a {job_role} position. Ask questions based on the following skills and experience:\n"
        for skill in skills:
            prompt += f"- Skill: {skill}\n"
        prompt += f"Experience Level: {experience_level}\nPlease provide 2 questions for each skill."  # Generating Prompt

        inputs = self.tokenizer(prompt, return_tensors="pt")

        outputs = self.model.generate(inputs.input_ids, max_length=700, temperature=0.7, num_return_sequences=1)

        questions_output = self.tokenizer.decode(outputs[0], skip_special_tokens=True)

        lines = questions_output.splitlines()  # Optimizing Format

        questions = []

        for line in lines:
            if line.strip() and (line.strip()[0].isdigit()):
                questions.append(line.strip())
        
        final_questions = []

        for question in questions:
            i = 0
            sentence = ""
            for word in question.split():
                if (i != 0):
                    sentence += word + " "
                i+=1
            sentence = sentence[:len(sentence)-1]
            final_questions.append(sentence)

        return final_questions[:10]
    
# Response Evaluation and Feeback by Llama

    def evaluate_responses(self, questions, responses):
        

        # Evaluation prompt (Test 4)
        '''prompt = "You are an expert interviewer. Evaluate the candidate's performance based on the following:\n\n"
        for i, (question, response) in enumerate(zip(questions, responses), start=1):
            prompt += f"Question {i}: {question}\nAnswer: {response}\n\n"
        prompt += "Provide detailed feedback on the candidate's overall performance and assign a score out of 10." '''

        #Evaluation prompt (Test 5)
        prompt = "You are an expert interviewer. Evaluate the candidate's performance based on the following:\n\n"

        for i, (question, response) in enumerate(zip(questions, responses), start=1):
            prompt += f"Question {i}: {question}\nAnswer: {response}\n\n"
        prompt += (
        "For each question, evaluate whether the answer directly addresses the question, demonstrates an understanding of the topic, and is relevant. Highlight any inaccuracies, irrelevant responses, or gaps in understanding. "
        "Then, provide detailed feedback on the candidate's overall performance, assign a score out of 10, and recommend areas for improvement."
        )

        # Tokenize input
        inputs = self.tokenizer(prompt, return_tensors="pt")
        outputs = self.model.generate(inputs.input_ids, max_length=700, temperature=0.7, num_return_sequences=1)

        feedback_output = self.tokenizer.decode(outputs[0], skip_special_tokens=True)

        return feedback_output
    
'''if __name__ == "__main__":
    generator = InterviewQuestionGenerator()
    job_role = "Java Developer"
    skills = ["Java", "Data Structures and Algorithms", "Object Oriented Programming"]
    experience_level = "Intermediate"
    
    questions = generator.generate_questions(job_role, skills, experience_level)
    print(questions) '''

# if __name__ == "__main__":
#     generator = InterviewQuestionGenerator()
#     questions = ['What is the difference between static and instance variables in Java, and when would you use each?',  'What is the time complexity of the Bubble Sort algorithm?']
#     answers = ['Hello World', "The bubble sort algorithm's average/worst time complexity is O(n²), as we have to pass through the array as many times as there are pairs in a provided array. Therefore, when time is a factor, there may be better options. Worst-case time complexity: O(n²)."]
    
#     feedback = generator.evaluate_responses(questions, answers)
#     print(feedback)