from transformers import AutoTokenizer, AutoModelForCausalLM
from dotenv import load_dotenv
import os

load_dotenv()

CHKPT_path = os.path.join(os.curdir ,os.getenv("CHKPT"))

def loadmodel():
    tokenizer = AutoTokenizer.from_pretrained(CHKPT_path)
    model = AutoModelForCausalLM.from_pretrained(CHKPT_path)
    return (model, tokenizer)