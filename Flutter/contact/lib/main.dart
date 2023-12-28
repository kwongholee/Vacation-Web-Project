import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
          appBar: AppBar(title: Text('앱임'),),
          body: Container(
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(width: 100, height: 100, color: Colors.black,),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('캐논 DSLR 100D (단렌즈, 충전기 16기가SD 포함)', style:
                      TextStyle(fontWeight: FontWeight.w900),),
                    Text('성동구 행당동 끌올 10분전'),
                    Text('210,000원'),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                      Icon(Icons.favorite),
                      Text('4')
                    ],)
                  ],
                )
              ],
            )
          ),
        )
    );
  }
}