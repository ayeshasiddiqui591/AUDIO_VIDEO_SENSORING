import whisper
import torch
from pydub import AudioSegment

class Word:
    def __init__(self, data):
        self.conf = data["conf"]
        self.end = data["end"]
        self.start = data["start"]
        self.word = data["word"]

    def to_string(self):
        return f"{self.word:20} from {self.start:.2f} sec to {self.end:.2f} sec, confidence is {self.conf * 100:.2f}%"

    def start_point(self):
        return [self.word,self.start,self.end]
    

def timestamp_list(base_audio_path, model_name="base"):
    
    model = whisper.load_model(model_name,device="cuda" if torch.cuda.is_available() else "cpu")

    result = model.transcribe(base_audio_path, word_timestamps=True, language="en")
    print(result['text'],'\n')

    list_of_Words = []
    for segment in result['segments']:
        for word in segment['words']:
            x=word['word'].strip().lower()
            if x[len(x)-1]=='.' or x[len(x)-1]==',' or x[len(x)-1]=='?' or x[len(x)-1]=='!':
                x=x[:len(x)-1]
            w = Word({
                "conf": word['probability'], 
                "start": word["start"],
                "end": word["end"],
                "word": x
            })
            list_of_Words.append(w)

    final = []
    for word in list_of_Words:
        time = word.start_point()
        final.append(time)
    
    return final

def censor_audio(base_audio_path, censor_audio_path, output_audio_path, model_name, to_censor, gain_of_censor=0, gain_of_base=0, silent=True):

    time_list = timestamp_list(base_audio_path, model_name)

    def find_time_occurrences(to_censor):
        result = []
        for word in to_censor:
            word = word.lower()
            for item in time_list:
                if item[0] == word:
                    print(f'Censoring {item[0]} from {item[1]} to {item[2]} seconds')
                    result.append((item[1] * 1000, item[2] * 1000))  
        return result

    censor_times = find_time_occurrences(to_censor)

    base_audio = AudioSegment.from_file(base_audio_path)
    censor_audio = AudioSegment.from_file(censor_audio_path)

    if gain_of_censor is not None:
        censor_audio = censor_audio + gain_of_censor

    for start_time, end_time in censor_times:
        end_time+=100
        duration = end_time - start_time 
        censor_segment = censor_audio[:duration] 

        while len(censor_segment) < duration:
            censor_segment += censor_audio

        censor_segment = censor_segment[:duration]  

        if silent:
            silence = AudioSegment.silent(duration=duration)
            base_audio = base_audio[:start_time] + silence + base_audio[end_time:]
        else:
            base_audio = base_audio[:start_time] + censor_segment + base_audio[end_time:]

    base_audio.export(output_audio_path, format="wav")
    print(f"Censored audio saved to {output_audio_path}")
    return output_audio_path

    

