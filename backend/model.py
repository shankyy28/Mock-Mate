from transformers import AutoTokenizer, AutoModelForCausalLM

def loadmodel():
    tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.2-1B-Instruct")
    model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.2-1B-Instruct")
    return (model, tokenizer)