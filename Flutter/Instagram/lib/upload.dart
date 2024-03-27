import 'package:flutter/material.dart';

class Upload extends StatefulWidget {
  const Upload({Key? key, this.userImage, this.getPost, this.post}) : super(key: key);
  final userImage;
  final getPost;
  final post;

  @override
  State<Upload> createState() => _UploadState();
}

class _UploadState extends State<Upload> {
  var inputData;
  var postData;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(actions: [
        IconButton(onPressed: () {
          setState(() {
            postData = {
              "id": widget.post.length,
              "image": widget.userImage,
              "likes": 0,
              "date": "Nov 30",
              "content": inputData,
              "user": "이광호"
            };
          });
          widget.getPost(postData);
          Navigator.pop(context);
        }, icon: Icon(Icons.send))
      ],),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Image.file(widget.userImage, width: 200, height: 200,),
          Text('image upload'),
          TextField(onChanged: (d) {setState(() {
                inputData = d;
              });
            },),
          IconButton(
            onPressed: () {
              Navigator.pop(context);
            },
            icon: Icon(Icons.close)),
        ],
      ),
    );
  }
}
