import 'package:flutter/material.dart';

void main() {
  runApp( MaterialApp(
      home: MyApp()
    )
  );
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  var name = ["이광호", "홍길동", "장영주"];
  var like = [0,0,0];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
          floatingActionButton: FloatingActionButton(onPressed: (){
            showDialog(context: context, builder: (context) {
              return Dialog(child: Text('내용'));
            });
          },),
          appBar: AppBar(),
          body: ListView.builder(
            itemCount: 3,
            itemBuilder: (c, i){
              return ListTile(
                leading: Icon(Icons.person),
                title: Text(name[i])
              );
            },
          ),
          bottomNavigationBar: BottomAppBar(),
        );
  }
}