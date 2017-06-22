#include<bits/stdc++.h>
#include <random>

using namespace std;

struct star{
	int x;
	int y;
	int lux;
	star(int a, int b, int c){
		x=a; y=b; lux=c;
	}
};
vector<star> vec;
int main()
{
	random_device rd;     // only used once to initialise (seed) engine
	mt19937 rng(rd());    // random-number engine used (Mersenne-Twister in this case)
	
	uniform_int_distribution<int> uni(-180, 180); // guaranteed unbiased
	uniform_int_distribution<int> ran(1, 1440);
	
	for(int i=0;i<7200;++i){
		//cout << uni(rng) << "\n";
		int light;
		if(ran(rng)<=14) light=2;
		else if(ran(rng)<=48) light=3;
		else if(ran(rng)<=150) light=4;
		else if(ran(rng)<=480) light=5;
		else light=6;
		star temp(int(uni(rng)/2), int(uni(rng)), light);
		vec.push_back(temp);
	}
	ofstream out("starlist.txt");
	for(auto it=vec.begin();it!=vec.end();++it){
		out << it->x << " " << it->y << " " << it->lux << "\n";
	}
	return 0;
}
