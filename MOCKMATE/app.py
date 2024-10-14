import streamlit as st

st.title("MockMate")

if "messages" not in st.session_state:
    st.session_state.messages = [{"role": "Interviewer", "content":"Hello! Could you please begin by introducing yourself"}]


for chat in st.session_state.messages:
    if chat["role"] == "user":
        st.write(f"**You**: {chat['content']}")
    else:
        st.write(f"**Interviewer**: {chat['content']}")



