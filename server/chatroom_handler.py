import tornado.web
from tornado.websocket import WebSocketHandler
import json
import ast
import uuid
import base64
import threading
from threading import Thread
import redis

# Defining Redis Connection 
# r = redis.StrictRedis(host='127.0.0.1',charset="utf-8", decode_responses=True)

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
            # user_message = {
            #     'author' : self.name,
            #     'message': message
            # }
            # r.publish('ChatRoom',message)
            ChatRoomHandler.send_updates(message)
        except Exception as e:
            print("Exception ",e)
    

    @classmethod
    def send_updates(cls, chat):
        # logging.info("sending message to %d waiters", len(cls.waiters))
        for listner in cls.listners:
            try:
                listner.write_message(chat)
            except Exception as e:
                print("Error sending message",e)


    # def listen_to_channel(self):
    #     self.pubsub = r.pubsub()
    #     print('CHANNELS:',self.pubsub.channels)
    #     self.pubsub.subscribe("ChatRoom")
    #     while True:
    #         try:
    #             for item in self.pubsub.listen():
    #                 print(item['data'],type(item['data']))
    #                 self.write_message(str(item['data']).encode('utf-8'))
    #         except Exception as e:
    #             print (e)

