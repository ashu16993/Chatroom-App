import tornado.web
from tornado.websocket import WebSocketHandler
import json
import ast
import uuid
import base64

class ChatRoomHandler(WebSocketHandler):
    listners = set()

    def check_origin(self, origin):
        return True
    def open(self):
        print("WebSocket connection established!")
        ChatRoomHandler.listners.add(self)
        self.sess_uid = base64.urlsafe_b64encode(uuid.uuid4().bytes).decode('UTF-8').replace('=', '')
        self.name = self.request.remote_ip
    
    def on_close(self):
        ChatRoomHandler.listners.remove(self)
    
    def on_message(self, message):
        try:
            print('current msg :',message)
            ChatRoomHandler.send_updates(message)
        except Exception as e:
            print("Exception ",e)
    

    @classmethod
    def send_updates(cls, chat):
        for listner in cls.listners:
            try:
                listner.write_message(chat)
            except Exception as e:
                print("Error sending message",e)
