import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:url_launcher/url_launcher.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late Future<List<dynamic>> _userData;

  @override
  void initState() {
    super.initState();
    _userData = _fetchUsersData();
  }

  final String serverUrl = 'http://10.0.2.2:8000/user/';

  Future<List<dynamic>> _fetchUsersData() async {
    final response = await http.get(Uri.parse(serverUrl));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as List<dynamic>;
    } else {
      throw Exception('Failed to load users data');
    }
  }

  Future<void> abrirMaps(double latitude, double longitude) async {
    final url =
        'https://www.google.com/maps/search/?api=1&query=$latitude,$longitude';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Não foi possível abrir o Google Maps';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Random User'),
      ),
      body: FutureBuilder<List<dynamic>>(
        future: _userData,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else {
            final userData = snapshot.data!;
            return ListView(
              padding: EdgeInsets.all(16.0),
              children: [
                ListTile(
                  title: Text('Nome do Usuário'),
                  subtitle: Text('${userData[0]['username']}'),
                ),
                ListTile(
                  title: Text('Latitude'),
                  subtitle: Text('${userData[0]['latitude']}'),
                ),
                ListTile(
                  title: Text('Longitude'),
                  subtitle: Text('${userData[0]['longitude']}'),
                ),
                ElevatedButton(
                  onPressed: () {
                    double lat = double.parse(userData[0]['latitude']);
                    double lng = double.parse(userData[0]['longitude']);
                    abrirMaps(lat, lng);
                  },
                  child: const Text("Ver localização"),
                )
              ],
            );
          }
        },
      ),
    );
  }
}
