import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:contacts_service/contacts_service.dart';

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
  var name = [];

  addOne(n) {
    setState(() {
      name.add(n);
    });
  }

  getPermission() async {
    var status = await Permission.contacts.status;
    if(status.isGranted) {
      var contacts = await ContactsService.getContacts();
      setState(() {
        name = contacts;
      });
    }
    else if(status.isDenied) {
      print("rejected");
      Permission.contacts.request();
      openAppSettings();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
          floatingActionButton: FloatingActionButton(onPressed: (){
            showDialog(context: context, builder: (context) {
              return DialogUI(addOne: addOne);
            });
          },),
          appBar: AppBar(title: Text(name.length.toString()), actions: [
            IconButton(onPressed: (){getPermission();}, icon: Icon(Icons.contacts))
          ],),
          body: ListView.builder(
            itemCount: name.length,
            itemBuilder: (c, i){
              return ListTile(
                leading: Icon(Icons.person),
                title: Text(name[i].givenName)
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
            TextButton(onPressed: () async {
              var newPerson = Contact();
              newPerson.givenName = inputData;
              await ContactsService.addContact(newPerson);
              Navigator.pop(context);
            }, child: Text("완료")),
            TextButton(onPressed: (){Navigator.pop(context);}, child: Text("취소"))
          ],
        ),
      ),
    );
  }
}
