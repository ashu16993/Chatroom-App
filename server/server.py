import tornado.ioloop
import tornado.web
from chatroom_handler import *

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

class TornadoWebServer(tornado.web.Application):
    def __init__(self):
        
        settings = {
            "debug":True,
            }
        handlers = [
            (r"/websocket", ChatRoomHandler)
        ]
        tornado.web.Application.__init__(self,handlers,**settings)

if __name__ == "__main__":
    print("Application started.")
    application = TornadoWebServer()
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8888)
    ioloop = tornado.ioloop.IOLoop.instance()
    ioloop.start()