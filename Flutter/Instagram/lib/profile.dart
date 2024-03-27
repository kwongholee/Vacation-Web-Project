import 'package:flutter/material.dart';
import 'main.dart';
import 'package:provider/provider.dart';

class Profile extends StatefulWidget {
  const Profile({Key? key}) : super(key: key);

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  @override
  void initState() {
    super.initState();
    context.read<Store1>().getImageData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Text('Profile page')),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: ProfileHeader(),
          ),
          SliverGrid(
            delegate: SliverChildBuilderDelegate(
                    (c,i) => Container(child: Image.network(context.watch<Store1>().profileImage[i]),),
                childCount: context.watch<Store1>().profileImage.length),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3),
          )
        ],
      )
    );
  }
}

class ProfileHeader extends StatefulWidget {
  const ProfileHeader({Key? key}) : super(key: key);

  @override
  State<ProfileHeader> createState() => _ProfileHeaderState();
}

class _ProfileHeaderState extends State<ProfileHeader> {
  var isPushed = false;
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        CircleAvatar(
          radius: 30,
          backgroundColor: Colors.grey,
          backgroundImage: AssetImage('assets/jiwoo.jpg'),
        ),
        Text('follower: ${context.watch<Store1>().follower}명'),
        ElevatedButton(onPressed: () {
          setState(() {
            isPushed = !isPushed;
          });
          context.read<Store1>().changeFollowerNum(isPushed);
        }, child: isPushed ? Text('팔로잉') : Text('팔로우')),
      ],
    );
  }
}

