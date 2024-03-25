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
  var name = ["이광호", "홍길동", "김정욱"];
  var like = [0,0,0];
  var total = 3;
  addOne(n) {
    setState(() {
      total++;
      name.add(n);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
          floatingActionButton: FloatingActionButton(onPressed: (){
            showDialog(context: context, builder: (context) {
              return DialogUI(addOne: addOne);
            });
          },),
          appBar: AppBar(title: Text(total.toString()),),
          body: ListView.builder(
            itemCount: total,
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

class DialogUI extends StatelessWidget {
  DialogUI({Key? key, this.addOne}) : super(key: key);
  final addOne;
  var inputData = "";

  @override
  Widget build(BuildContext context) {
    return Dialog(
      child: Container(
        padding: EdgeInsets.all(20),
        width: 300,
        height: 300,
        child: Column(
          children: [
            TextField(onChanged: (n) {inputData = n;},),
            TextButton(onPressed: (){
              addOne(inputData);
              Navigator.pop(context);
            }, child: Text("완료")),
            TextButton(onPressed: (){Navigator.pop(context);}, child: Text("취소"))
          ],
        ),
      ),
    );
  }
}
