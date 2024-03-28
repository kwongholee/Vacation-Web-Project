import 'package:flutter/material.dart';
import 'style.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter/rendering.dart';
import 'upload.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:shared_preferences/shared_preferences.dart';
import 'profile.dart';
import 'package:provider/provider.dart';
import 'notification.dart';

void main() async {
  runApp(
    ChangeNotifierProvider(create: (c) => Store1(), child: MaterialApp(
      theme: theme,
      home: MyApp(),
    ),)
  );
}

class Store1 extends ChangeNotifier {
  var follower = 0;
  var profileImage = [];
  getImageData() async {
    var result = await http.get(Uri.parse('https://codingapple1.github.io/app/profile.json'));
    profileImage = jsonDecode(result.body);
    notifyListeners();
  }
  changeFollowerNum(b) {
    if(b) {
      follower++;
    } else {
      follower--;
    }
    notifyListeners();
  }
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  var tab = 0;
  var post = [];
  var direction = "up";
  var userImage;

  saveData() async {
    var storage = await SharedPreferences.getInstance();
    storage.setString('name', 'data');
    var result = storage.get('name');
  }

  getPost(l) {
    setState(() {
      post.add(l);
    });
  }

  setDirection(d) {
    setState(() {
      direction = d;
    });
  }

  getData() async {
    var result = await http.get(Uri.parse("https://codingapple1.github.io/app/data.json"));
    setState(() {
      post = jsonDecode(result.body);
    });
  }

  @override
  void initState() {
    super.initState();
    getData();
    saveData();
    initNotification(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        child: Text('alarm'),
        onPressed: () {
          showNotification2();
        },
      ),
      appBar: AppBar(
        title: Text("Instagram"),
        actions: [
            IconButton(
                onPressed: () async {
                  var picker = ImagePicker();
                  var image = await picker.pickImage(source: ImageSource.gallery);
                  if(image != null) {
                    setState(() {
                      userImage = File(image.path);
                    });
                    Navigator.push(context,
                        MaterialPageRoute(builder: (c) => Upload(userImage: userImage, getPost: getPost, post: post))
                    );
                  }
                },
                icon: Icon(Icons.add_box_outlined),
                iconSize: 30,
            )
          ],
      ),
      body: [Home(r: post, setR: getPost, setD: setDirection), Text("shop")][tab],
      bottomNavigationBar: direction == "up" ? BottomNavigationBar(
        showSelectedLabels: false,
        showUnselectedLabels: false,
        onTap: (i) {
          setState(() {
            tab = i;
          });
        },
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home_outlined,), label: '홈'),
          BottomNavigationBarItem(icon: Icon(Icons.shopping_bag_outlined), label: '샵'),
        ],
      ) : null
    );
  }
}

class Home extends StatefulWidget {
  const Home({Key? key, this.r, this.setR, this.setD}) : super(key: key);
  final r;
  final setR;
  final setD;

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  var scroll = ScrollController();

  getMoreData() async {
    var result = await http.get(Uri.parse('https://codingapple1.github.io/app/more1.json'));
    widget.setR(jsonDecode(result.body));
  }

  @override
  void initState() {
    super.initState();
    scroll.addListener(() {
      if(scroll.position.pixels == scroll.position.maxScrollExtent) {
        getMoreData();
      }
      if(scroll.position.userScrollDirection == ScrollDirection.reverse) {
        widget.setD("down");
      }
      else {
        widget.setD("up");
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    if(widget.r.isNotEmpty) {
      return ListView.builder(
        itemCount: widget.r.length,
        controller: scroll,
        itemBuilder: (c, i) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              widget.r[i]['image'] is File
              ? Image.file(widget.r[i]['image'])
              : Image.network(widget.r[i]['image']),
              GestureDetector(
                child: Text(widget.r[i]['user']),
                onTap: () {
                  Navigator.push(context,
                    PageRouteBuilder(
                        pageBuilder: (c,a1,a2) => Profile(),
                        transitionsBuilder: (c,a1,a2,child) => 
                            FadeTransition(opacity: a1, child: child),
                    )
                  );
                },
              ),
              Text('좋아요 ${widget.r[i]['likes']}'),
              Text(widget.r[i]['content'])
            ],
          );
        },
      );
    } else {
      return Text("로딩중");
    }
  }
}
